<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>Space Map With Algolia Searching...</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script async src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
        integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc=" crossorigin="anonymous">
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <link rel="stylesheet" href={{ asset('css/app.css') }}>
    <style>
        #map {
            height: 100%;
        }

        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        ul#property_list>li {
            padding: 5px;
            font-weight: 600;
        }

        .sideFilters {
            width: 60%;
            display: inline-flex;
            position: fixed;
            overflow-y: scroll;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }

        .mt5 {
            margin-top: 15px !important
        }

        .property_list {
            width: 100% !important;
            float: left !important;
            background-color: gainsboro !important;
            list-style: auto !important;
            font-weight: 600;
        }

        .ais-RangeSlider .rheostat-handle {
            background-color: #fff;
            background-image: linear-gradient(-180deg, #fff, #fcfcfd);
            border: 1px solid #d6d6e7;
            border-radius: 50% !important;
            box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
            height: 18px;
            width: 18px;
            margin-left: -6px;
            top: -6px;
        }

        .ais-RangeSlider .rheostat-handle:after,
        .ais-RangeSlider .rheostat-handle:before {
            content: none !important
        }

    </style>
</head>

<body>
    <div class="sideFilters" style="padding: 10px 0px">
        <div class="ais-InstantSearch" style=" width: 100% !important;">
            <div style="margin: 5px">
                <div id="clear-refinements" onclick="clearFilters()"></div>

                <div class="mt5">
                    <b>Total Item:</b>
                    <div id="total_counts"></div>
                </div>


                <div class="mt5">
                    <b>Select Category:</b>
                    <div id="menu"></div>
                </div>

                <div class="mt5">
                    <b>Search Space:</b>
                    <input type="search" class="ais-SearchBox-input " name="searchboxMap" id="searchboxMap"
                        placeholder="Search Any spaces." style="width: 100%;padding: 10px;">

                    <div id="searchbox" class="ais-SearchBox"></div>
                    <input type="hidden" name="address_lat" id="address_lat">
                    <input type="hidden" name="address_lon" id="address_lon">
                </div>

                <div class="mt5">
                    <b>Price Range:</b>
                    <div id="range-slider" style="margin: 0px 15px; padding-top: 10px;"></div>
                </div>

                <div class="mt5">
                    <b>Space Size:</b>
                    <div id="size-slider" style="margin: 0px 15px; padding-top: 10px;"></div>
                </div>

                <div class="mt5">
                    <b>Amenities:</b>
                    <div id="amenities-list"></div>
                </div>

                <div class="mt5">
                    <b>Sort By:</b>
                    <div class="ais-MenuSelect">
                        <div id="sort-by">
                        </div>
                    </div>
                </div>

                <div class="mt5">
                    <b>Space Lists:</b>
                    <ol id="hits_property_list" class="property_list mt5"> </ol>
                    {{-- <ol id="property_list" class="property_list mt5"> </ol> --}}
                </div>
                <script type="text/html" id="hit-template">
                    @verbatim
                        <li data-id="{{ id }}"> R{{ algolia_daily_price }} {{ property_size }} m² {{ name }}</li>
                    @endverbatim
                </script>
            </div>
        </div>
    </div>

    <div style="width: 40%; float: right;" id="map"></div>

    <div id="loader" class="loader test">
        <div class="loader-list">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.32.0/dist/algoliasearchLite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js"
        integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous">
    </script>
    <script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/jquery.min.js') }}"></script>
    <script async
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&callback=initMap&libraries=places&v=weekly">
    </script>

    <script>
        /** Initial Configuration Start */
        const menuIDName = "menu"
        const searchboxIDName = "searchbox"
        const rangeSliderID = "range-slider"
        const sizeSliderID = "size-slider"
        const amenitiesCheckboxId = "amenities-list"
        const MapElement = document.getElementById("map")

        var hitsPerPage = 20000;
        var defaultCenter = {
            lat: -28.900355963903394,
            lng: 24.41479325270591
        }
        var radius = '{{ env('SEARCH_RADIUS') }}'
        radius = parseInt(radius) * 1000;

        let GMap = null
        let AutoComplete = null

        /** Global Vars for Filtering  */
        let BOUNDRY_AREA = []
        let SEARCH_LAT_LNG_FROM_SEARCH = ''
        let SEARCHING_TEXT = ''
        let SPACE_PROPERTY_TYPE = ''
        let RANGE_SLIDER_STARTING = 0
        let RANGE_SLIDER_ENDING = null
        let SIZE_RANGE_SLIDER_STARTING = 0
        let SIZE_RANGE_SLIDER_ENDING = null
        let FILTERIZED_QUERY_OBJECT = {}
        let AMENITIES_FILTER_ARRAY = []
        let MapMarkers = null
        let markerClusterer

        /** Algolia Configurations */
        var app = '{{ env('ALGOLIA_APP_ID') }}';
        var secret = '{{ env('ALGOLIA_SECRET') }}';
        var indexName = '{{ env('ALGOLIA_APP_INDEX_NAME') }}';
        var indexNameDesc = '{{ env('ALGOLIA_APP_INDEX_NAME_DESC') }}';
        var indexNameAsc = '{{ env('ALGOLIA_APP_INDEX_NAME_ASC') }}';
        var indexNameSizeDesc = '{{ env('ALGOLIA_APP_INDEX_NAME_SIZE_DESC') }}';
        var indexNameSizeAsc = '{{ env('ALGOLIA_APP_INDEX_NAME_SIZE_ASC') }}';
        var indexNameFeatured = '{{ env('ALGOLIA_APP_INDEX_NAME_FEATURED') }}';

        var SortItems = [{
                label: "Newest",
                value: indexName
            },
            {{-- {
                label: "Recommended Space",
                value: indexNameFeatured
            }, --}} {
                label: "Price: Highest to Lowest",
                value: indexNameDesc
            },
            {
                label: "Price: Lowest to Highest",
                value: indexNameAsc
            },
            {
                label: "Size: Largest to Smallest",
                value: indexNameSizeDesc
            },
            {
                label: "Size: Smallest to Largest",
                value: indexNameSizeAsc
            }
        ];

        // Creating instance for Algolia Search
        const client = algoliasearch(app, secret);
        const index = client.initIndex(indexName);

        /** Creating Searching Object */
        const search = instantsearch({
            indexName: indexName,
            searchClient: algoliasearch(app, secret),
        })

        /** Setup Global Map */
        function setUpGlobalMap() {
            GMap = new google.maps.Map(MapElement, {
                zoom: 6,
                center: defaultCenter,
                mapTypeControlOptions: {
                    mapTypeIds: ["roadmap"],
                },
            });

            // Set Search Map List
            var searchboxMapInput = document.getElementById('searchboxMap');
            var options = {
                componentRestrictions: {
                    country: "ZA"
                },
            };
            AutoComplete = new google.maps.places.Autocomplete(searchboxMapInput, options);

            GMap.addListener('dragend', function() {
                setMapBoundryArea()
            })
            GMap.addListener('dblclick', function() {
                setMapBoundryArea()
            })
            GMap.addListener('zoom_changed', function() {
                setMapBoundryArea()
            })

            /** GMAP EVENTS */
            AutoComplete.addListener("place_changed", () => {
                const place = AutoComplete.getPlace();
                if (place && place.name) {
                    let LatLongSearch = {
                        ...place.geometry.location
                    };
                    GMap.fitBounds(place.geometry.viewport, {
                        animate: true,
                    });

                    $('#address_lat').val(LatLongSearch.lat()).change();
                    $('#address_lon').val(LatLongSearch.lng()).change();

                    /** Updating Algolia configurations */
                    search.addWidget(
                        instantsearch.widgets.configure({
                            hitsPerPage,
                            aroundLatLng: LatLongSearch.lat() + ", " + LatLongSearch.lng(),
                            aroundRadius: radius,
                            ...FILTERIZED_QUERY_OBJECT
                        })
                    );
                    findDataFromAlgolia()
                }
            });
        }



        // Create the render function
        const renderClearRefinements = (renderOptions, isFirstRender) => {
            const {
                hasRefinements,
                refine,
                widgetParams
            } = renderOptions;

            if (isFirstRender) {

                const button = document.createElement('button');
                button.textContent = 'Clear Filters';
                button.className = "ais-ClearRefinements-button";

                button.addEventListener('click', () => {
                    refine();
                });
                widgetParams.container.appendChild(button);
            }
        };

        // Create the custom widget
        const customClearRefinements = instantsearch.connectors.connectClearRefinements(
            renderClearRefinements
        );

        // Create the render function
        const renderHits = (renderOptions, isFirstRender) => {
            const {
                hits,
                widgetParams
            } = renderOptions;

            widgetParams.container.innerHTML = `<ul>
                ${hits
                    .map(
                    (item, ke) =>
                        `<li>
                                        ${++ke}
                                        (P ${item.algolia_daily_price})
                                        (S ${item.property_size})
                                        ${instantsearch.highlight({ attribute: 'name', hit: item })}
                                    </li>`
                    )
                    .join('')}
                </ul>
            `;
        };

        // Create the custom widget
        const customHits = instantsearch.connectors.connectHits(renderHits);

        /** sort by start */
        // Create the render function
        const renderSortBy = (renderOptions, isFirstRender) => {
            const {
                options,
                currentRefinement,
                hasNoResults,
                refine,
                widgetParams,
            } = renderOptions;
            if (isFirstRender) {
                const select = document.createElement("select");
                select.className = "ais-MenuSelect-select";
                select.addEventListener("change", event => {
                    $("#loader").show();
                    console.log('Sort Change', event.target.value)
                    findDataFromAlgolia()
                    refine(event.target.value);
                    findDataFromAlgolia()
                    {{-- sortReplicaByIndex(event.target.value) --}}
                });
                const button = document.createElement("a");
                button.className = "dropdown-toggle";
                widgetParams.container.appendChild(button);
                widgetParams.container.appendChild(select);
            }

            function sortReplicaByIndex(index) {
                console.log('index', index)
                index.setSettings({
                    replicas: [index]
                }).then((res) => {
                    console.log('RES: ', res)
                    // done
                });
            }

            const select = widgetParams.container.querySelector("select");
            select.disabled = hasNoResults;
            select.innerHTML = `
                ${options
                    .map(
                        option => `
                                                                <option class="ais-MenuSelect-option"
                                                                    value="${option.value}"
                                                                    ${option.value === currentRefinement ? "selected" : ""}
                                                                >
                                                                    ${option.label}
                                                                </option>
                                                                `
                    )
                    .join("")}
            `;
            widgetParams.container.querySelector("a").innerHTML = `</i></a>`;
        };

        // Create the custom widget
        const customSortBy = instantsearch.connectors.connectSortBy(renderSortBy);

        const hitTemplate = document.getElementById("hit-template").innerHTML;

        // Adding Filters wedgets
        search.addWidgets([
            // Range Filtering
            instantsearch.widgets.rangeSlider({
                container: document.querySelector(`#${rangeSliderID}`),
                attribute: 'algolia_daily_price',
                step: 100,
                tooltips: {
                    format: function(rawValue) {
                        return parseInt(rawValue);
                    }
                },
            }),

            // Size Range Filtering
            instantsearch.widgets.rangeSlider({
                container: document.querySelector(`#${sizeSliderID}`),
                attribute: 'property_size',
                step: 100,
                tooltips: {
                    format: function(rawValue) {
                        return parseInt(rawValue) + " m²";
                    }
                },
            }),

            // Dropdown Filter
            instantsearch.widgets.menuSelect({
                container: `#${menuIDName}`,
                attribute: 'space_property_type.name',
                limit: 1000,
                transformItems(items) {
                    /** Refresh Map */
                    var selectedItem = items.filter(item => item.isRefined == true)
                    SPACE_PROPERTY_TYPE = selectedItem && selectedItem.length > 0 ?
                        selectedItem[0].label : ''
                    findDataFromAlgolia()
                    return items;
                },
            }),

            /** AMENITIES Filter */
            instantsearch.widgets.refinementList({
                container: `#${amenitiesCheckboxId}`,
                attribute: 'features.feature.name',
                transformItems(items) {
                    /** Refresh Map */
                    var selectedItem = []
                    items.forEach(item => {
                        if (item.isRefined == true) {
                            selectedItem.push({
                                label: item.label
                            })
                        }
                    })
                    AMENITIES_FILTER_ARRAY = selectedItem
                    findDataFromAlgolia()
                    return items;
                },
            }),

            /** Clear all Filters */
            customClearRefinements({
                container: document.querySelector('#clear-refinements'),
            }),

            instantsearch.widgets.sortBy({
                container: '#sort-by',
                items: SortItems,
                transformItems(items) {
                    findDataFromAlgolia()
                    return items;
                },
            }),

            customHits({
                container: document.querySelector('#hits_property_list'),
            }),

            instantsearch.widgets.configure({
                hitsPerPage,
                aroundRadius: radius,
                ...FILTERIZED_QUERY_OBJECT.filters
            })
        ])
        search.start();

        /** Price range change actions */
        $(document).on('DOMSubtreeModified', `#${rangeSliderID} .rheostat-handle-lower .rheostat-tooltip`, function() {
            var getendingrateVal = $(this).text();
            RANGE_SLIDER_STARTING = parseInt(getendingrateVal.split(' ')[0] ||
                0) // spitig "2054 m2" with first number selection.
            findDataFromAlgolia()
        });
        $(document).on('DOMSubtreeModified', `#${rangeSliderID} .rheostat-handle-upper .rheostat-tooltip`, function() {
            var getendingrateVal = $(this).text();
            RANGE_SLIDER_STARTING = parseInt(getendingrateVal.split(' ')[0] ||
                0) // spitig "2054 m2" with first number selection.
            findDataFromAlgolia()
        });

        /** Size range change actions */
        $(document).on('DOMSubtreeModified', `#${sizeSliderID} .rheostat-handle-lower .rheostat-tooltip`, function() {
            var getendingrateVal = $(this).text();
            SIZE_RANGE_SLIDER_STARTING = parseInt(getendingrateVal.split(' ')[0] ||
                0) // spitig "2054 m2" with first number selection.
            findDataFromAlgolia()
        });

        $(document).on('DOMSubtreeModified', `#${sizeSliderID} .rheostat-handle-upper .rheostat-tooltip`, function() {
            var getspacingendingsize = $(this).text();
            SIZE_RANGE_SLIDER_ENDING = parseInt(getspacingendingsize.split(' ')[0] ||
                0) // spitig "2054 m2" with first number selection.
            findDataFromAlgolia()
        });

        /** Find Data by filters */
        async function fetchIndexData(params = {}) {
            var filterQueryString = ''
            /** Filter Category */
            if (SPACE_PROPERTY_TYPE) {
                filterQueryString += `space_property_type.name:"${SPACE_PROPERTY_TYPE}"`
            }

            /** Filter Price Range */
            if (RANGE_SLIDER_ENDING) {
                var operator = filterQueryString.length > 0 ? ' AND ' : ''
                filterQueryString +=
                    ` ${operator} algolia_daily_price:${parseInt(RANGE_SLIDER_STARTING)} TO ${parseInt(RANGE_SLIDER_ENDING)}`
            } else {
                var operator = filterQueryString.length > 0 ? ' AND ' : ''
                filterQueryString = (filterQueryString + operator) +
                    `algolia_daily_price >= ${parseInt(RANGE_SLIDER_STARTING)}`
            }

            /** Filter Size Range */
            if (SIZE_RANGE_SLIDER_ENDING) {
                var operator = filterQueryString.length > 0 ? ' AND ' : ''
                filterQueryString +=
                    ` ${operator} property_size:${parseInt(SIZE_RANGE_SLIDER_STARTING)} TO ${parseInt(SIZE_RANGE_SLIDER_ENDING)}`
            } else {
                var operator = filterQueryString.length > 0 ? ' AND ' : ''
                filterQueryString = (filterQueryString + operator) +
                    `property_size >= ${parseInt(SIZE_RANGE_SLIDER_STARTING)}`
            }

            /** Aminities Checkboxes */
            if (AMENITIES_FILTER_ARRAY && AMENITIES_FILTER_ARRAY.length > 0) {
                AMENITIES_FILTER_ARRAY.forEach((checkbox, index) => {
                    filterQueryString += ` AND features.feature.name:"${checkbox.label}"`
                })
            }

            /** Finalize Query Object */
            FILTERIZED_QUERY_OBJECT = {
                filters: filterQueryString,
                ...(BOUNDRY_AREA && BOUNDRY_AREA.length && {
                    insideBoundingBox: [BOUNDRY_AREA],
                    aroundRadius: radius,
                }),
                ...(SEARCH_LAT_LNG_FROM_SEARCH && SEARCH_LAT_LNG_FROM_SEARCH.length && {
                    aroundLatLng: SEARCH_LAT_LNG_FROM_SEARCH,
                    aroundRadius: radius,
                }),
                ...(SEARCHING_TEXT && {
                    facets: ["name"],
                    maxValuesPerFacet: 100,
                }),
                hitsPerPage: hitsPerPage,
            }
            return await getQueryResult()
        }

        /** Generating Map Details Points and It's Space name */
        function generateMapViewPage(allData) {
            let {
                hits
            } = allData

            // Refectoring Space Name List
            refreshingSpaceNamesLists(hits)
            MapMarkers = hits.map((object, i) => {
                var location = {
                    lat: parseFloat(object.address_lat),
                    lng: parseFloat(object.address_lon)
                }
                var PropertyName = (i + 1) + ". " + object.name
                var infowindow = new google.maps.InfoWindow({
                    content: PropertyName,
                });
                let marker = new google.maps.Marker({
                    position: location,
                    GMap,
                    title: PropertyName,
                })

                /** On Map Point click show Space Name */
                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        GMap,
                        shouldFocus: false,
                    });
                });
                return marker;
            });

            // Add a marker clusterer to manage the markers.
            creatingMapClusters()

            /** Event for map boundry Changes */
            {{-- GMap.addListener("bounds_changed", async () => {
                var mpBound = GMap.getBounds(false).toJSON()
                /** Set Global for apply Other Search */
                BOUNDRY_AREA = [mpBound.south, mpBound.east, mpBound.north, mpBound.west]
                FILTERIZED_QUERY_OBJECT.insideBoundingBox = [BOUNDRY_AREA]
                FILTERIZED_QUERY_OBJECT.aroundRadius = radius
                var aroundLatLngData = await getQueryResult()
                refreshingSpaceNamesLists(aroundLatLngData.hits)
                console.log('Total Space', aroundLatLngData.hits.length)

                /** reset configurations on change */
                // search.addWidget(
                //     instantsearch.widgets.configure({
                //         hitsPerPage,
                //         aroundRadius: radius,
                //         ...FILTERIZED_QUERY_OBJECT
                //     })
                // )
            }); --}}
        }

        /** Get Data from Algolia */
        async function getQueryResult() {
            return await index.search(SEARCHING_TEXT || '', FILTERIZED_QUERY_OBJECT).then((
                hits) => hits);
        }

        /** Initialization of the Map */
        async function initMap() {
            setUpGlobalMap()
            findDataFromAlgolia()
        }

        /** Main Filters Applying */
        async function findDataFromAlgolia() {
            $("#loader").show();
            generateMapViewPage(await fetchIndexData())
            $("#loader").hide();
        }

        /** Add a marker clusterer to manage the markers. */
        function creatingMapClusters() {
            // Clears all clusters and markers from the clusterer.
            if (markerClusterer) markerClusterer.clearMarkers();
            markerClusterer = new MarkerClusterer(GMap, MapMarkers, {
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            });
        }

        /** Quick refreshing the space names list */
        function refreshingSpaceNamesLists(hits) {
            if (hits && hits.length) {
                $('#hits_property_list').empty();
                $('#total_counts').text(hits.length);
                hits?.forEach(({
                    name,
                    algolia_daily_price,
                    property_size
                }) => {
                    $("#hits_property_list").append(
                        `<li>
                  (P ${algolia_daily_price}) - (S ${property_size}) => ${name}
                </li>
                `);
                })
            }
        }

        /** Set Map Boundry Area for search */
        async function setMapBoundryArea() {
            var mpBound = GMap.getBounds(false).toJSON()
            /** Set Global for apply Other Search */
            BOUNDRY_AREA = [mpBound.south, mpBound.east, mpBound.north, mpBound.west]
            FILTERIZED_QUERY_OBJECT.insideBoundingBox = [BOUNDRY_AREA]
            FILTERIZED_QUERY_OBJECT.aroundRadius = radius
            console.log('FILTERIZED_QUERY_OBJECT', {...FILTERIZED_QUERY_OBJECT})
            findDataFromAlgolia()
            {{-- refreshingSpaceNamesLists(await getQueryResult()) --}}
        }

        /** Clear Map Filter */
        function clearFilters() {
            SPACE_PROPERTY_TYPE = ''
            SEARCH_LAT_LNG_FROM_SEARCH = ''
            RANGE_SLIDER_STARTING = 0
            RANGE_SLIDER_ENDING = null
            AMENITIES_FILTER_ARRAY = []
            $('#searchboxMap').val('').change()
            $('.ais-MenuSelect-select').val('')
            findDataFromAlgolia()
        }
    </script>
</body>

</html>
