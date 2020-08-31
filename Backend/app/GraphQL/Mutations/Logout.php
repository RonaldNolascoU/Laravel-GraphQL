<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use App\User;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args): ?User
    {
        // TODO implement the resolver
        $guard = Auth::guard(config('sanctum.guard'));
        $user = $guard->user();
        $user->tokens()->where('tokenable_id', $user->id)->delete();
        // $guard->logout();

        return $user;
    }
}
