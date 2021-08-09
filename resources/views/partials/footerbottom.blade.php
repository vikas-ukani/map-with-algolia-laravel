@yield('footer_script')
<script>
    var base_env = "{{ env('APP_ENV') }}";
    var api_url = "{{ env('API_URL') }}";
    var base_url = '{{URL::to('')}}';
    var token = "{{ session()->get('user_token') }}";
    var userType = "{{ session()->get('userType') }}";
    var user_id = "{{ session()->get('user_id') }}";
    var auth_name = "{{ session()->get('auth_name') }}";
    var is_verify_fica_detail = "{{ session()->get('is_verify_fica_detail') }}";
    var is_staff = "{{ session()->get('is_staff') }}";
    var user_permission_name = "{{ session()->get('permission_name') }}";
</script>
<script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/jquery.min.js') }}"></script>
<script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/jquery.validate.min.js') }}"></script>
<script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/jquery.redirect.js') }}"></script>
<script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/popper.min.js') }}"></script>
<script src="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ url('js/main.js') }}"></script>
@if( env('APP_ENV') == 'production')
<script src="{{ url('js/front/functions.js') }}"></script>
@endif
{{--  <script src="{{ url('js/front/contact.js') }}"></script>  --}}
@yield ('scripts')
