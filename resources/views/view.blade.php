@extends('layouts.master')

@section('css')
    <link href="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/css/slick.min.css') }}" rel="stylesheet">
    <link href="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/css/slick-theme.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/bootstrap-datepicker3.min.css') }}" rel="stylesheet">
    {{-- <link href="{{ url('css/ion.rangeSlider.min.css') }}" rel="stylesheet">
<link href="{{ url('css/select2.min.css') }}" rel="stylesheet" />
<link href="{{ url('css/select2.css') }}" rel="stylesheet" /> --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <link href="{{ url('css/algolia.css') }}" rel="stylesheet" />

    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>

    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css" />
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css" />

@stop()

@section('content')
    @include('map-filter.index')
@stop()

@section('scripts')

    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <script src="https://dkrr9o6ir0yt2.cloudfront.net/assets/js/slick.min.js"></script>

    <script src="{{ url('js/bootstrap-datepicker.min.js') }}"></script>
    {{-- <script src="{{ url('/js/front/mapInput.js') }}"></script> --}}
    <script src="{{ url('js/front/favourite.js') }}"></script>
    {{-- <script src="{{ url('js/front/algolia.js') }}"></script> --}}

    <script src="https://dkrr9o6ir0yt2.cloudfront.net/assets/js/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.32.0/dist/algoliasearchLite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js"
        integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous">
    </script>
    <script async
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&callback=initMap&libraries=places&v=weekly">
    </script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js"></script>

    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"></script>

    <script type="text/javascript">
        $(window).on("load", function() {
            /* Slider */
            if ($.fn.slick) {
                $('.spaceinner-carousel').slick({
                    autoplay: false,
                    lazyLoad: 'ondemand',
                    dots: true,
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
                    nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
                });
            }
        });

        /** Initial Configuration Start */
        const menuIDName = "menu"
        const searchboxIDName = "searchbox"
        const rangeSliderID = "range-slider"
        const sizeSliderID = "size-slider"
        const amenitiesCheckboxId = "amenities-list"
        const MapElement = document.getElementById("geo-search")

        var hitsPerPage = 20000;
        var AlgoliaPageLimit = 20;
        var defaultZoom = 6;
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
                zoom: defaultZoom, 
                center: defaultCenter, 
                disableDefaultUI: true,  
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
                            hitsPerPage: AlgoliaPageLimit,
                            aroundLatLng: LatLongSearch.lat() + ", " + LatLongSearch.lng(),
                            aroundRadius: radius,
                            ...FILTERIZED_QUERY_OBJECT
                        })
                    );
                    findDataFromAlgolia()
                }
            });
        }

        /** Clear Search filters */
        function clearAddress() {
            $('#searchboxMap').val('').change();
            $('#address_lat').val('');
            $('#address_lon').val('');
            $('#address_lon').trigger('change');

            resetMapViewPoint()

        }

        /** Reset Map View Points when clear search */
        function resetMapViewPoint() {
            GMap.setCenter(defaultCenter);
            GMap.setZoom(defaultZoom)
        }

        /** Create the render function */
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


        /*Pagination start*/
        // Create the render function
        const renderPagination = (renderOptions, isFirstRender) => {
            const {
                pages,
                currentRefinement,
                nbPages,
                nbHits,
                isFirstPage,
                isLastPage,
                refine,
                createURL,
                widgetParams
            } = renderOptions;
            const container = document.querySelector("#pagination");
            widgetParams.container.innerHTML = `
    ${
        !nbHits
            ? ""
            : `
                                        ${pages
                                            .map(
                                                page => `
                            <span class="text-right ${
                                currentRefinement !== page ? "d-none" : ""
                            }" >
                            ${currentRefinement * AlgoliaPageLimit + 1} - ${
                                isLastPage ? nbHits : (page + 1) * AlgoliaPageLimit
                            }  of ${nbHits}
                            </span>
                            `
                                            )
                                            .join("")}

                                        ${
                                            !isFirstPage
                                                ? `<a
                        href="${createURL(currentRefinement - 1)}"
                        data-value="${currentRefinement - 1}"
                    ><i class="icon icon-chevron-left-gray ml-2"></i>
                    </a>`
                                                : `<i class="icon icon-chevron-left-gray ml-2"></i>`
                                        }
                                        ${
                                            !isLastPage
                                                ? `<a
                        href="${createURL(currentRefinement + 1)}"
                        data-value="${currentRefinement + 1}"
                    ><i class="icon icon-chevron-right-gray ml-2"></i>
                    </a>`
                                                : `<i class="icon icon-chevron-right-gray ml-2"></i>`
                                        }
                                        `
            }
            `;

            [...widgetParams.container.querySelectorAll("a")].forEach(element => {
                element.addEventListener("click", event => {
                    $("#loader").show();
                    $("#space-list").hide();
                    $("#space-top-list").show();
                    $("#space-bottom-list").show();
                    event.preventDefault();
                    refine(event.currentTarget.dataset.value);
                });
            });
            // const container1 = document.querySelector("#tot_records");
            const container1 = document.querySelector(".tot_records");

            container1.innerHTML =
                `<p class="text-lg-left text-sm-right text-left"><span class="text-primary font-weight-bold">${nbHits}</span> properties found</p>`;
            // document.querySelector(".tot_records").innerHTML = `<p class="text-lg-left text-right"><span class="text-primary font-weight-bold">${nbHits}</span> properties found</p>`;
            // myFavoritesFindSpace();
        };
        // Create the custom widget
        const customPagination = instantsearch.connectors.connectPagination(
            renderPagination
        );


        /** hitsperpage  Start */
        // Create the render function
        const renderConfigure = (renderOptions, isFirstRender) => {
            const {
                refine,
                widgetParams
            } = renderOptions;

            if (isFirstRender) {
                const button = document.createElement("a");
                const button1 = document.createElement("select");
                button.className = "dropdown-toggle";
                button1.className = "custom-select";

                button.addEventListener("click", () => {
                    $("#loader").show();
                    $("#space-list").hide();
                    $("#space-top-list").show();
                    $("#space-bottom-list").show();

                    //   document.querySelector("#configure").value = button1.value;
                    refine({
                        hitsPerPage: (widgetParams.searchParameters.hitsPerPage =
                            button1.value)
                    });
                });

                button1.addEventListener("change", () => {
                    $("#loader").show();
                    $("#space-list").hide();
                    $("#space-top-list").show();
                    $("#space-bottom-list").show();
                    AlgoliaPageLimit = button1.value;

                    $(".custom-select").val(button1.value);
                    // widgetParams.container.querySelector('.custom-select').value = button1.value;
                    refine({
                        hitsPerPage: (widgetParams.searchParameters.hitsPerPage =
                            button1.value)
                    });
                });

                widgetParams.container.appendChild(button);
                widgetParams.container.appendChild(button1);
                widgetParams.container.querySelector("select").innerHTML =
                    "<option>20</option><option>30</option><option>50</option><option>100</option>";
            }
            widgetParams.container.querySelector("a").textContent = `Items per page:`;
        };

        // Create the custom widget
        const customConfigure = instantsearch.connectors.connectConfigure(
            renderConfigure,
            () => {}
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
                ).join('')}
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
                    findDataFromAlgolia()
                    refine(event.target.value);
                    findDataFromAlgolia()
                });
                const button = document.createElement("a");
                button.className = "dropdown-toggle";
                widgetParams.container.appendChild(button);
                widgetParams.container.appendChild(select);
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

        function pluck(item) {
            var keys = [];
            var newK;

            array = item.space_property_images;
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    newK = array[i];
                    if (newK["property_image_path"].indexOf("_collage.jpg") != -1) {} else {
                        newK["property_image_path"] =
                            newK["property_image_path"].split("property/")[0] +
                            "property/small_" +
                            newK["property_image_name"];
                    }
                    keys.push(newK);
                }
                array = keys;
            }
            item.space_property_images = array;
            return item;
        }

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
                // container: '#sort-by-bottom',
                items: SortItems,
                transformItems(items) {
                    {{-- findDataFromAlgolia() --}}
                    return items;
                },
            }),

            {{-- customHits({
                container: document.querySelector('#hits_property_list'),
            }), --}}
            instantsearch.widgets.hits({
                container: "#filter-space-list",
                templates: {
                    empty: `<div class="col-md-12 py-5 my-5 text-center"> We didn't find any results for the search.</div`,
                    item: hitTemplate
                },
                transformItems(items) {
                    return items.map(item => (
                        pluck(item)
                    ));
                }
            }),

            customPagination({
                container: document.querySelector("#pagination")
            }),

            customConfigure({
                container: document.querySelector("#configure"),
                searchParameters: {
                    // hitsPerPage: 30
                    hitsPerPage: hitsPerPage
                }
            }),

            instantsearch.widgets.configure({
                hitsPerPage: AlgoliaPageLimit,
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

        $("body").on('DOMSubtreeModified', "#filter-space-list", function(e) {
            $("#loader").hide();
            $(".empty-space").hide();
            $("#space-list").show();
            $("#space-top-list").show();
            $("#space-bottom-list").show();
            reInitCarousel();
        });

        function reInitCarousel() {
            // setTimeout(function() {  
            $(".spaceinner-carousel").not(".slick-initialized").slick({
                autoplay: false,
                dots: true,
                adaptiveHeight: true,
                slidesToShow: 1,
                prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
                nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>"
            });
            // }, 1000);
        }

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
            // refreshingSpaceNamesLists(hits)
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
            findDataFromAlgolia()

            search.addWidget(
                instantsearch.widgets.configure({
                    insideBoundingBox: [BOUNDRY_AREA],
                    hitsPerPage: AlgoliaPageLimit,
                    aroundRadius: radius,
                })
            );
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
@stop()
