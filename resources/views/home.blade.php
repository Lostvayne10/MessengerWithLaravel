@extends('layouts.app')

@section('content')
<b-container fluid style="height: calc(100vh - 56px)">
    <messenger-component :user-id="{{ auth()->id() }}"></messenger-component>
</b-container>


@endsection
