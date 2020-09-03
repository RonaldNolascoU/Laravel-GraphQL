<?php

namespace App\GraphQL\Mutations;

use App\Post;
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
        $post = new Post([
            'author_id' => auth()->user()->id,
            'title' => 'test',
            'content' => $args['content'],
            'image' => Storage::disk('s3')->put($filename, base64_decode($args['image']));
            // 'image' => $args['image'] ? $args['image'] : null
        ]);
        $post->save();
        // $context->user()->posts()->save($post);

        return $post;
    }
}
