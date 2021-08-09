<title>Space Map With Algolia Searching...</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="apple-touch-icon" sizes="76x76" href="{{ url('images/fav/apple-touch-icon.png') }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ url('images/fav/favicon-32x32.png') }}">
<link rel="icon" type="image/png" sizes="16x16" href="{{ url('images/fav/favicon-16x16.png') }}">
<link rel="manifest" href="{{ url('images/fav/site.webmanifest') }}">
<meta name="msapplication-TileColor" content="#1FC38E">
<meta name="theme-color" content="#1FC38E">
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="canonical" href="{{ url()->current() }}" />
<link rel="stylesheet" href="{{ url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css') }}" type="text/css" defer>


<link href="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/css/slick-theme.min.css') }}" rel="stylesheet">
<link href="{{ url('https://dkrr9o6ir0yt2.cloudfront.net/assets/css/slick.min.css') }}" rel="stylesheet">
<link href="{{ url('css/bootstrap-datepicker3.min.css') }}" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"/>

<link rel="preload" type="text/css" href="{{ url('css/font.css') }}" as="style" onload="this.rel = 'stylesheet'"/>
{{--<link rel="stylesheet" href="{{ url('css/font.css') }}" type="text/css" defer> --}}
<link rel="stylesheet" href="{{ url('css/icon.css') }}" type="text/css" defer>
<link rel="stylesheet" href="{{ url('css/app.css') }}" type="text/css" defer>
<link rel="stylesheet" href="{{ url('css/media.css') }}" type="text/css" defer>
<link rel="stylesheet" href="{{ url('css/skeleton.css') }}" type="text/css" defer>

<link href={{ asset('css/algolia.css') }} rel="stylesheet" />
<link rel="stylesheet" href={{ asset('css/custom.css') }}>