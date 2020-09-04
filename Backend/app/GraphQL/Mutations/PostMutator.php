<?php

namespace App\GraphQL\Mutations;

use App\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        $imageContent = $args['image'] ? $args['image'] : null;
        $path = $args['image'] ? $args['image'][0]->store('image', 's3'): null;

        $post = new \App\Post([
            'author_id' => Auth::user()->id,
            'title' => 'test',
            'content' => $args['content'],
            'image' => $args['image'] ? 'https://testing1995.s3.us-east-2.amazonaws.com/image/' . basename($path) : null
        ]);
        $post->save();
        // $context->user()->posts()->save($post);

        return $post;
    }
}
