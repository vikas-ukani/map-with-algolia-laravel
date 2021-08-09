/* global instantsearch algoliasearch */
var hitsPerPage = 9;

const search = instantsearch({
    indexName: indexName,
    searchClient: algoliasearch(app, secret)
});

search.addWidget(
    instantsearch.widgets.configure({
        hitsPerPage: hitsPerPage,
        filters: "company_id:58"
    })
);

search.addWidget(
    instantsearch.widgets.menuSelect({
        container: "#property-list",
        attribute: "space_property_type.name",
        limit: 1000
    })
);

// 1. Create a render function
const renderRefinementList = (renderOptions, isFirstRender) => {
    const {
        items,
        refine,
        createURL,
        isShowingMore,
        canToggleShowMore,
        searchForItems,
        toggleShowMore,
        widgetParams
    } = renderOptions;

    if (isFirstRender) {
        const ul = document.createElement("ul");
        ul.className = "ais-RefinementList-list row pt-3 mb-3";
        widgetParams.container.appendChild(ul);

        //   button.textContent = 'Show more';
        //   button.addEventListener('click', () => {
        //     toggleShowMore();
        //   });
        //   widgetParams.container.appendChild(button);
    }
    widgetParams.container.querySelector("ul").innerHTML = items
        .map(
            item => `
            <li class="ais-RefinementList-item col-xl-4 mb-3">
                <a href="${createURL(item.value)}"
                data-value="${item.value}">
                    <span class="custom-control custom-checkbox">
                        <input class="custom-control-input" type="checkbox" ${item.isRefined ? 'checked' : ''} class="ais-RefinementList-checkbox" value="${item.value}">
                        <label class="custom-control-label" for="customCheck"><span class="ais-RefinementList-text">${item.value}</span> <span class="ais-RefinementList-count">${item.count}</span></label>
                    </span>
                </a>
            </li>
        `
        )
        .join("");

    [...widgetParams.container.querySelectorAll("a")].forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            refine(event.currentTarget.dataset.value);
        });
    });

    // const button = widgetParams.container.querySelector('button');
    // button.disabled = !canToggleShowMore;
    // button.textContent = isShowingMore ? 'Show less' : 'Show more';
};

// 2. Create the custom widget
const customRefinementList = instantsearch.connectors.connectRefinementList(
    renderRefinementList
);

// 3. Instantiate
search.addWidgets([
    customRefinementList({
        container: document.querySelector("#features-list"),
        attribute: "features.feature.name",
        showMoreLimit: 100,
        operator: 'and',
        limit: 1000
    })
]);
// search.addWidget(
//     instantsearch.widgets.menuSelect({
//         container: '#features-list',
//         attribute: 'features.feature.name',
//         limit: 1000,
//     })
// );

search.addWidget(
    instantsearch.widgets.rangeSlider({
        container: "#rates-range-slider",
        attribute: "algolia_daily_price",
        tooltips: {
            format: function(rawValue) {
                return "R " + parseInt(rawValue);
            }
        },
        cssClasses: {
            root: "MyDailyRangeSlider"
        }
    })
);

search.addWidget(
    instantsearch.widgets.rangeSlider({
        container: "#size-range-slider",
        attribute: "property_size",
        tooltips: {
            format: function(rawValue) {
                return parseInt(rawValue) + " m²";
            }
        },
        cssClasses: {
            root: "MyDailyPropertySizeSlider"
        }
    })
);

const hitTemplate = document.getElementById("hit-template").innerHTML;

search.addWidget(
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
    })
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
        createURL
    } = renderOptions;
    const container = document.querySelector("#pagination");
    container.innerHTML = `
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
                    ${currentRefinement * hitsPerPage + 1} - ${
                        isLastPage ? nbHits : (page + 1) * hitsPerPage
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
                    : `<a><i class="icon icon-chevron-left-gray ml-2"></i></a>`
            }
            ${
                !isLastPage
                    ? `<a
                        href="${createURL(currentRefinement + 1)}"
                        data-value="${currentRefinement + 1}"
                    ><i class="icon icon-chevron-right-gray ml-2"></i>
                    </a>`
                    : `<a><i class="icon icon-chevron-right-gray ml-2"></i></a>`
            }
            `
    }
    `;

    [...container.querySelectorAll("a")].forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            refine(event.currentTarget.dataset.value);
        });
    });
    const container1 = document.querySelector("#tot_records");
    container1.innerHTML = `<p class="text-lg-left"><span class="text-primary font-weight-bold">${nbHits}</span> properties found</p>`;
    myFavoritesFindSpace();
};
// Create the custom widget
const customPagination = instantsearch.connectors.connectPagination(
    renderPagination
);
// Instantiate the custom widget
search.addWidgets([
    customPagination({
        container: document.querySelector("#pagination")
    })
]);
/** Pagination End */

/** hitsperpage  Start */
// Create the render function
const renderConfigure = (renderOptions, isFirstRender) => {
    const { refine, widgetParams } = renderOptions;

    if (isFirstRender) {
        const button = document.createElement("a");
        const button1 = document.createElement("select");
        button.className = "dropdown-toggle";
        button1.className = "custom-select";

        button.addEventListener("click", () => {
            refine({
                hitsPerPage: (widgetParams.searchParameters.hitsPerPage =
                    button1.value)
            });
        });

        button1.addEventListener("change", () => {
            hitsPerPage = button1.value;
            refine({
                hitsPerPage: (widgetParams.searchParameters.hitsPerPage =
                    button1.value)
            });
        });

        widgetParams.container.appendChild(button);
        widgetParams.container.appendChild(button1);
        widgetParams.container.querySelector("select").innerHTML =
            "<option>9</option><option>12</option><option>15</option>";
    }

    widgetParams.container.querySelector("a").textContent = `Items per page:`;
};

// Create the custom widget
const customConfigure = instantsearch.connectors.connectConfigure(
    renderConfigure,
    () => {}
);

// Instantiate the custom widget
search.addWidgets([
    customConfigure({
        container: document.querySelector("#configure"),
        searchParameters: {
            hitsPerPage: hitsPerPage
        }
    })
]);
/** hitsperpage  End */

/** sort by start */
// Create the render function
const renderSortBy = (renderOptions, isFirstRender) => {
    const {
        options,
        currentRefinement,
        hasNoResults,
        refine,
        widgetParams
    } = renderOptions;
    if (isFirstRender) {
        const select = document.createElement("select");
        select.className = "custom-select";
        select.addEventListener("change", event => {
            refine(event.target.value);
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
            <option
                value="${option.value}"
                ${option.value === currentRefinement ? "selected" : ""}
            >
                ${option.label}
            </option>
            `
            )
            .join("")}
    `;
    widgetParams.container.querySelector("a").innerHTML = `Sort by: </i>
    </a>`;
};

// Create the custom widget
const customSortBy = instantsearch.connectors.connectSortBy(renderSortBy);

// Instantiate the custom widget
search.addWidgets([
    customSortBy({
        container: document.querySelector("#sort-by"),
        items: [
            { label: "Newest", value: indexName },
            { label: "Price: Highest to Lowest", value: indexNameDesc },
            { label: "Price: Lowest to Highest", value: indexNameAsc },
            { label: "Size: Largest to Smallest", value: indexNameSizeDesc },
            { label: "Size: Smallest to Largest", value: indexNameSizeAsc }
        ]
    })
]);
/** sort by end */

function pluck_old(array) {
    var keys = [];
    var newK;
    if (array) {
        for (var i = 0; i < array.length; i++) {
            newK = array[i];
            if (newK["property_image_path"].indexOf("_collage.jpg") != -1) {
            } else {
                newK["property_image_path"] =
                    newK["property_image_path"].split("property/")[0] +
                    "property/small_" +
                    newK["property_image_name"];
            }
            keys.push(newK);
        }
        return keys;
    }
}

function pluck(item) {
    var keys = [];
    var newK;
    array = item.space_property_images;
    if (array) {
        for (var i = 0; i < array.length; i++) {
            newK = array[i];
            if (newK["property_image_path"].indexOf("_collage.jpg") != -1) {
            } else {
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

var customRangeWidget = {
    init(initOptions) {
        $(".datepicker").change(function() {
            var dateBegin = $("#unavailableStartDate").val();
            var dateEnd = $("#unavailableEndDate").val();
            var endpoint =
                api_url +
                "space/unavailable?from=" +
                dateBegin +
                "&to=" +
                dateEnd;
            $.get(endpoint, function(response) {
                var spaces = response.data || [];
                var spaceIds = spaces.map(function(space) {
                    return space.property_id;
                });
                var uniqueSpaceIds = [...new Set(spaceIds)];
                initOptions.helper.state.filters = '';
                initOptions.helper.setState(
                    Object.assign({}, initOptions.state, {
                        facets: ["id"],
                        facetsExcludes: {
                            id: uniqueSpaceIds
                        }
                    })
                );
                /*if(dateBegin =='' || dateEnd == ''){
                    initOptions.helper.state.filters = 'is_rented:0';
                }*/
                initOptions.helper.search();
            });
        });
    }
};
search.addWidget(customRangeWidget);

// Create the render function
const renderClearRefinements = (renderOptions, isFirstRender) => {
    const { hasRefinements, refine, widgetParams } = renderOptions;
  
    if (isFirstRender) {

      const button = document.createElement('button');
      button.textContent = 'Clear Filters';
      button.className = "btn btn-xs btn-outline-dark";
      button.setAttribute('data-toggle','collapse');  
      button.setAttribute('data-target','#features-amenities');  
      button.setAttribute('aria-expanded','false');  
      button.setAttribute('aria-controls','features-amenities');  

      button.addEventListener('click', () => { 
        $("#features-amenities").toggle();
        $("#loader").show();
        $("#space-list").hide();
        $("#space-top-list").hide();
        refine();
      });
  
      widgetParams.container.appendChild(button);
    }    
  };
  
  // Create the custom widget
  const customClearRefinements = instantsearch.connectors.connectClearRefinements(
    renderClearRefinements
  );
  
  // Instantiate the custom widget
  search.addWidgets([
    customClearRefinements({
      container: document.querySelector('#clear-refinements'),     
    })
  ]);

search.start();

function getTimeStamp(date, utc) {
    var parts = date.split("-");
    parts[1] -= 1;
    if (utc) {
        return Date.UTC(parts[2], parts[1], parts[0]);
    }
    return new Date(parts[2], parts[1], parts[0]).getTime();
}
function reInitCarousel() {
    // setTimeout(function() {
        $(".spaceinner-carousel")
            .not(".slick-initialized")
            .slick({
                autoplay: false,
                dots: true,
                adaptiveHeight: true,
                slidesToShow: 1,
                prevArrow:
                    "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
                nextArrow:
                    "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>"
            });
    // }, 1000);
}


function reInitCarouselCities() {
        $(".space-city-carousel")
            .not(".slick-initialized")
            .slick({
                autoplay: false,
                dots: true,
                adaptiveHeight: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon icon-small-chevron-right'></i></div>",
                nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
                responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
                ]
            });
}
$(document).ready(function() {
    $("#filter-space-list").bind("DOMSubtreeModified", function() {
        reInitCarousel();
        reInitCarouselCities();
    });
});

window.addEventListener('load', function() {
  var startgetstartingrateVal = $("#rates-range-slider .rheostat-handle-lower .rheostat-tooltip").text();
  $("#startingpriceperday").text(startgetstartingrateVal);

  var endgetstartingrateVal = $("#rates-range-slider .rheostat-handle-upper .rheostat-tooltip").text();
  $("#endingpriceperday").text(endgetstartingrateVal);

  var startspacesizeVal = $("#size-range-slider .rheostat-handle-lower .rheostat-tooltip").text();
  $("#startingspacesize").text(startspacesizeVal);

  var endspacesizeVal = $("#size-range-slider .rheostat-handle-upper .rheostat-tooltip").text();
  $("#endingspacesize").text(endspacesizeVal);
});


$(document).on('DOMSubtreeModified','#rates-range-slider .rheostat-handle-lower .rheostat-tooltip',function(){
 var getstartingrateVal = $(this).text();
 $("#startingpriceperday").text(getstartingrateVal);
});

$(document).on('DOMSubtreeModified','#size-range-slider .rheostat-handle-lower .rheostat-tooltip',function(){
 var getspacestaringsize = $(this).text();
 $("#startingspacesize").text(getspacestaringsize);
});

$(document).on('DOMSubtreeModified','#rates-range-slider .rheostat-handle-upper .rheostat-tooltip',function(){
 var getendingrateVal = $(this).text();
 $("#endingpriceperday").text(getendingrateVal);
});

$(document).on('DOMSubtreeModified','#size-range-slider .rheostat-handle-upper .rheostat-tooltip',function(){
 var getspacingendingsize = $(this).text();
 $("#endingspacesize").text(getspacingendingsize);
});