<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
@include('partials.head')
</head>

<body class="body-header">
	@include('partials.navigation')
	@yield('content')
	@include('partials.footerbottom')
	@include('partials.footer')
</body>
</html>