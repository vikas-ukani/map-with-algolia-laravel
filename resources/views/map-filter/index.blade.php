<div class="section-filter d-lg-flex">
{{--  sideFilters  --}}
        <div class=" filter-left">
            <div class=" filter-wrap" >
                <div class="d-lg-none d-block">
                    <div class="close-panel d-flex justify-content-between align-items-center">
                        <a class="close-filter" href="javascript:void(0);"><i class="icon icon-close-black"></i></a>
                        <label class="align-middle"><i class="icon icon-filter mr-1 pt-1"></i> Filter</label>
                        {{--  <a href="javascript:void(0);" id="clear-refinements" onclick="clearFilters()">Clear</a>  --}}
                    </div>
                    {{-- <p class="text-right mb-3">25 Properties found</p> --}}
			    </div>

                <form>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <input type="search" class="form-control" placeholder="Where can we find space for you?" id="searchboxMap" name="searchboxMap" />
                                <div id="clearSearch" class="ais-SearchBox-reset" type="reset" title="Clear the search query." onclick="javascript:clearAddress();" style="margin-top: -10px;">X</div>
                                <div id="searchbox" class="ais-SearchBox"></div>
                            </div>

                            <div class="form-group d-none">
                                <input type="hidden" name="address_street_number" id="street_number">
                                <input type="hidden" name="address_route" id="route">
                                <input type="hidden" name="address_city" id="locality">
                                <input type="hidden" name="address_state" id="administrative_area_level_1">
                                <input type="hidden" name="address_country" id="country">
                                <input type="hidden" name="address_lat" id="address_lat" value="{{ $addressData['address_lat'] ?? ''}}">
                                <input type="hidden" name="address_lon" id="address_lon" value="{{ $addressData['address_lon'] ?? ''}}">
                                <input type="hidden" name="address_postal_code" id="postal_code">
                                <input type="hidden" name="address_url" id="address_url">
                                <input type="hidden" name="around_radius" id="around_radius" value="<?php echo env('SEARCH_RADIUS'); ?>">
                            </div>
                        </div>

                        <div class="col-lg-6">
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-3">
                            <div class="form-group">
                                <label class="mb-1">Price Range</label>
                                <div id="range-slider"></div>
                                <div class="d-flex justify-content-between sm-tooltip">
                                    <p id="startingpriceperday"></p>
                                    <p id="endingpriceperday"></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="form-group mb-lg-0 mb-5">
                                <label class="mb-1 mt-3 mt-lg-0">Space Size</label>
                                {{-- <p class="range-label">0m² - 1500m²+</p> --}}
                                <div id="size-slider"></div>
                                {{-- <input class="ranger" type="text" name="" value="" /> --}}
                                <div class="d-flex justify-content-between sm-tooltip">
                                    <p id="startingspacesize"></p>
                                    <p id="endingspacesize"></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="mb-1">Select Category </label>
                                        <div id="menu"></div>
                                    </div>
                                </div>

                                <div class="col-lg-6 align-self-center">
                                    <div class="form-group">
                                        <span class="btn-filter btn-block px-lg-4" type="button" 
                                            data-toggle="collapse" data-target="#features-amenities" 
                                            aria-expanded="false" aria-controls="features-amenities">
                                            More Filters 
                                            <i class="icon icon-chevron-down-black"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="filter-collapse">
                                <div class="collapse" id="features-amenities">
                                    <label class="mb-2">Amenities</label>

                                    <div id="amenities-list"></div>
                                    <div class="text-right mb-lg-2 mb-4">
                                        <div id="clear-refinements"></div>
                                        {{-- <button class="btn btn-xs btn-outline-dark" type="button" id="clear_filters">Clear Filters</button> --}}
                                        {{-- <button class="btn btn-xs btn-primary ml-2" type="button" data-toggle="collapse" data-target="#features-amenities" aria-expanded="false" aria-controls="features-amenities">Apply</button> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            <div >

        <div class="filter-breadcrum" id="space-top-list">
			<div class="row no-gutters align-items-lg-center">
				<div class="col-xl-3 col-lg-3 col-sm-6 col-12">
					<div class="dropdown"  id="sort-by">
					</div>
				</div>

				<div class="col-xl-3 col-lg-3 col-sm-6 col-12 tot_records" id="tot_records"></div>

				<div class="col-xl-3 col-lg-3 col-sm-6 col-6">
                    <div class="dropdown text-lg-right" id="configure"></div>
                </div> 
				<div class="col-xl-3 col-lg-3 col-sm-6 col-6 text-right" id="pagination">

                </div>
			</div>
            
		</div>

                    <div class="mt5 filter-spacelist " id="space-list">            
                       <div class="" id="filter-space-list">                    
                        </div>
                    </div>
                    <div class="filter-breadcrum1 filter-breadcrum-bottom1" id="space-bottom-list">
                        <div class="row no-gutters align-items-lg-center">
                            <div class="col-xl-4 col-lg-4 col-sm-6 col-12">
                                <div class="dropdown"  id="sort-by-bottom">
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-4 col-sm-6 col-12 tot_records" id="tot_records_bottom"></div>
                            <div class="col-xl-3 col-lg-4 col-sm-6 col-6">
                                <div class="dropdown text-lg-right" id="configure-bottom"></div>
                            </div> 
                            <div class="col-xl-2 col-lg-12 col-sm-6 col-6 text-right" id="pagination-bottom">
                            </div>
                        </div>
                    </div>

                    <script type="text/html" id="hit-template">
                        @verbatim
                        <div class="space-item" data-id="{{ id }}">
                            <div class="spaceinner-carousel" id="slider_{{ id }}">
                                {{#space_property_images}}
                                    {{#property_image_path}}
                                        <div class="space-image-item">
                                            <a href="<?php echo url( '/space'); ?>/{{ slug }}">
                                            <img src="{{property_image_path}}" class="img-fluid" alt="{{name}}" />
                                            </a>
                                        </div>
                                    {{/property_image_path}}
                                {{/space_property_images}}
                            </div>
                            <div class="space-favorite" id="my-fav-space-{{ id }}">
                                <a class="space-like" onclick="javascript:addToFavorite({{ id }},this)">
                                    <i class="icon icon-heart" title="Add as Favourite"></i>
                                </a>
                            </div>
                            <a class="space-title text-truncate" href="<?php echo url( '/space'); ?>/{{ slug }}">{{ name }}</a>
                            <div class="d-flex justify-content-between">
                                <p class="space-address text-truncate lead">{{ full_address }}</p>
                                <p class="space-size">{{ property_size }} m²</p>
                            </div>
                            <div>
                                <p class="space-price">R{{ algolia_daily_price }} <span class="space-size">per day</span></p>
                            </div>
                        </div>
                        @endverbatim
                    </script>
                </div>
            </div>
        </div>

        <div class="filter-right">
            <div id="findlocation" class="find-map">
                <div id="geo-search"></div>
            </div>
        </div>

        <div id="loader" class="loader test">
            <div class="loader-list">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>
</div>