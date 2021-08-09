<!-- Navigation -->
<header class="header">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand d-lg-flex" href="/">
				<img loading="lazy" height="37" width="250" src="{{ url('images/logo.svg') }}" alt="SpaceMatch">
			</a>

			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#mobiletoggle" aria-controls="mobiletoggle" aria-expanded="false" aria-label="Toggle navigation">
				<span class="icon-bar top-bar"></span>
				<span class="icon-bar middle-bar"></span>
				<span class="icon-bar bottom-bar"></span>
			</button>

			<div class="collapse navbar-collapse" id="mobiletoggle">
				{{-- @if (!Request::is('dashboard')) --}}
				{{-- @if(session()->get('user_token') == '') --}}
				<ul class="navbar-nav ml-auto">
					<li class="nav-item @if (Request::is('find-space')) {{'active'}} @endif">
						<a class="nav-link" href="{{url( '/find-space')}}">Find space</a>
					</li>
					<li class="nav-item @if (Request::is('space-owner')) {{'active'}} @endif">
						<a class="nav-link" href="{{url( '/space-owner')}}">space owner</a>
					</li>
					<li class="nav-item @if (Request::is('space-user')) {{'active'}} @endif">
						<a class="nav-link" href="{{url( '/space-user')}}">space user</a>
					</li>
					<li class="nav-item @if (Request::is('contact-us')) {{'active'}} @endif">
						<a class="nav-link" href="{{url( '/contact-us')}}">Contact Us</a>
					</li>
				</ul>
				{{-- @endif --}}
				{{-- //@if (Request::is('dashboard')) --}}
				@if(session()->get('user_token') != '' || Request::is('dashboard'))
				<ul class="navbar-nav ml-auto navbar-loggedin align-items-lg-center">
					@php
					$dashbord_url = '';
					$profile_url = '';
					$user_type = session()->get('userType');
					if($user_type == 'tenant'){
					$profile_url = url('/tenant-profile');
					$dashbord_url = url('/dashboard-tenant');
				}

				if($user_type == 'landlord'){
				$profile_url = url('/landlord-profile');
				$dashbord_url = url('/dashboard-landlord');
			}


			if($user_type == 'both'){
			$profile_url = url('/landlord-profile');
			$dashbord_url = url('/dashboard');
		}
		@endphp

		{{-- <li class="nav-item nav-dashboard">
			<a title="Dashboard" class="nav-link text-truncate" href="{{$dashbord_url}}"><span class="icon icon-dashboard mr-2"></span>Dashboard</a>
		</li> --}}

		{{-- <li class="nav-item">
			<a class="nav-link" href="javascript:void(0);"><span class="icon icon-user"></span>
				<span class="username text-truncate" title="{{ session()->get('auth_name') }}">{{ session()->get('auth_name') }}</span></a>
			</li> --}}

			{{-- <li class="nav-item">
				<a class="nav-link" href="javascript:void(0);">Logout</a>

				<a class="nav-link" href="javascript:void(0)" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
					{{ __('Logout') }}
				</a>


				<form id="logout-form" action="{{ url('logout') }}" method="POST" style="display: none;">
					{{ csrf_field() }}
				</form>


			</li> --}}

			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="javascript:void(0);" id="myAccountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span class="icon icon-user"></span>
					<span title="{{ session()->get('auth_name') }}">{{ session()->get('auth_name') }}</span>
				</a>
				<div class="dropdown-menu" aria-labelledby="myAccountDropdown">
					<a title="Dashboard" class="dropdown-item" href="{{$dashbord_url}}"></span>Dashboard</a>
					@if($user_type == 'landlord' || $user_type == 'both')
					<a title="My Space" class="dropdown-item" href="{{ url('landlord-my-spaces') }}"></span>My Space</a>
					@endif
					<a title="My Profile" class="dropdown-item" href="{{$profile_url}}"></span>My Profile</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item dropdown-logout" href="javascript:void(0)" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
						{{ __('Logout') }}
					</a>
					<form id="logout-form" action="{{ url('logout') }}" method="POST" style="display: none;">
						{{ csrf_field() }}
					</form>
				</div>
			</li>
		</ul>

		@else

		<ul class="navbar-nav ml-auto navbar-login">
			<li class="nav-item @if (Request::is('register')) {{'disabled'}} @endif">
				<a class="btn btn-outline-light" href="{{ url('/register') }}">register</a>
			</li>
			<li class="nav-item @if (Request::is('login', 'forgot-password' , 'reset-password')) {{'disabled'}} @endif">
				<a class="btn btn-primary" href="{{ url('/login') }}">login</a>
			</li>
		</ul>
		@endif

	</div>
</div>
</nav>
</header>