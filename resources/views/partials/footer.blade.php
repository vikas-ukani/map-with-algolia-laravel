@if(Route::current()->getName() == 'find-space' || Route::current()->getName() == 'city' || Route::current()->getName() == 'mall')
<div class="footer-search bg-dark d-flex d-lg-none">
  @if(Route::current()->getName() == 'find-space')
  <a class="chat toggle-map" href="javascript:void(0);" onclick="javascript:showMap();">
    <i class="icon icon-map-white"></i>
  </a>
  @endif
  <a class="search" href="javascript:void(0);">
    <i class="icon icon-search"></i>
  </a>
</div>
@endif
<footer class="footer bg-dark text-white">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="footer-link">
          <h6 class="text-uppercase mb-2">
            <a class="d-inline-block" href="/">
              <img loading="lazy" height="30" width="145" src="{{ url('images/logo-footer.svg') }}" class="img-fluid d-block" alt="SpaceMatch" />
            </a>
          </h6>
          <ul>
            <li><a href="javascript:void(0);">About Us</a></li>
            <li><a href="{{url( '/company')}}">Company</a></li>
            <li class="dropdown">
              <a class="dropdown-toggle" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                How <span class="text-capitalize">SpaceMatch</span> works
              </a>

              <div class="dropdown-menu">
                <a class="dropdown-item" href="{{url( '/space-user')}}">find space</a>
                <a class="dropdown-item" href="{{url( '/space-owner')}}">list space</a>
              </div>
            </li>
            <li><a href="{{url( '/faq')}}">Faq's</a></li>
            <li><a href="{{url('/popup-trend')}}">#startsomething</a></li>
            <li><a href="{{url('/blogs')}}">Blog</a></li>
          </ul>
        </div>

        <div class="footer-link footer-social">
          <ul class="list-inline">
            <li class="list-inline-item"><a rel="noreferrer" target="_blank" href="https://web.facebook.com/SpaceMatch.ZA/"><i class="icon icon-facebook shake"></i></a></li>
            <li class="list-inline-item"><a rel="noreferrer" target="_blank" href="https://www.instagram.com/spacematch_za/"><i class="icon icon-instagram shake"></i></a></li>
            <li class="list-inline-item"><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/company/spacematch/"><i class="icon icon-linkedin shake"></i></a></li>
          </ul>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="footer-link footer-contact">
          <h6 class="text-uppercase">Contact Us</h6>
          <div class="pt-2">
            <a id="emailUsLink" href="mailto:info@spacematch.co.za">info@spacematch.co.za</a>
          </div>
          <p>Send us an email and we will get back to you within 24 hours</p>
        </div>

        <div class="footer-link footer-message">
          <h6 class="text-uppercase">NEWS</h6>
          <p>Subscribe and we will add you to our monthly newsletter featuring spaces, trends and inspiration </p>
          <div class="row" id="contact-success-message" style="display: none;">
            <div class="col-lg-12">
              <p class="text-success text-center font-weight-medium lead mt-3 text-primary" id="contact-success-message-show"></p>
            </div>
          </div>
          <form class="mt-3" id="contactForm">
            <div class="form-group">
              <input type="text" name="email" id="email" placeholder="Email Address" class="form-control form-control-square" />
              <button type="button" id="contactus"  class="btn btn-primary">Send</button>
            </div>
            <em id="email_error" class="error invalid-feedback"></em>
            {{-- <div class="form-group">
              <label class="col-form-label">NEWS</label>
              <input type="text" name="message" id="message" class="form-control form-control-square" />
              <em id="message_error" class="error invalid-feedback"></em>
            </div> --}}
            <em id="contactus_error"  class="error invalid-feedback"></em>
          </form>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="footer-list">
          <div class="row gutters-30 ">
            <div class="col-lg-12">
              <h4><a href="{{url( '/')}}" class="text-primary">Find a rental space.</a></h4>
            </div>

            <div class="col-lg-6">
              <div class="footer-link">
                <h6 class="mb-1">South Africa’s Shopping Centres</h6>
                @if(!empty($footer_malls->data))
                <a href="{{url('/all-malls')}}">All Shopping Centres</a>
                <ul>
                  <li><a class="text-uppercase text-white">FEATURED</a></li>
                  @foreach ($footer_malls->data as $mall)
                  <li><a href="{{url( '/mall/'.$mall->slug)}}">{{ $mall->name }}</a></li>
                  @endforeach
                </ul>
                @endif
              </div>
            </div>

            <div class="col-lg-6">
              <div class="footer-link">
                <h6 class="mb-1">South Africa’s Suburbs & Cities</h6>
                @if(!empty($footer_cities->data))
                <a href="{{url('/all-cities')}}">All Suburbs & Cities</a>
                <ul>
                  <li><a class="text-uppercase text-white">FEATURED</a></li>
                  @foreach ($footer_cities->data as $city)
                  <li><a href="{{url( '/city/'.$city->slug)}}">{{ $city->name }} Retail Space</a></li>
                  @endforeach
                </ul>
                @endif
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <ul class="footer-bottom-link">
          <li><a href="{{url('/privacy-policy')}}">Privacy Policy</a></li>
          <li><a href="{{url('/terms-and-condition')}}">Terms of Service</a></li>
          <li><a href="{{url('/acceptable-use-policy')}}">Acceptable Use Policy</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
