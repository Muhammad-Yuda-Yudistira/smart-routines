<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- favicon --}}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="assets/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="assets/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="assets/favicon/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />


        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
