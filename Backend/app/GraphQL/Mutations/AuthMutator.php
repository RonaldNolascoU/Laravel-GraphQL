<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use GraphQL\Type\Definition\ResolveInfo;

class AuthMutator
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ['email', 'password']);
        if (Auth::once($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('access-token');
            return $token->plainTextToken;
        }

        return null;
    }
}
