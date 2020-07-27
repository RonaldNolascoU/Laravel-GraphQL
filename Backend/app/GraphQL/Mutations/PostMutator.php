<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PostMutator
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function create($rootValue, array $args, GraphQLContext $context)
    {
        $post = new \App\Post([
            'author_id' => Auth::user()->id,
            'title' => 'test',
            'content' => $args['content']
        ]);
        $context->user()->posts()->save($post);

        return $post;
    }
}
