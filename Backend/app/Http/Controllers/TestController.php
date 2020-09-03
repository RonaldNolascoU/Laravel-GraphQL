<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{
    public function create()
    {
        return view('test');
    }
    public function store(Request $request)
    {
        $path = $request->file('image')->store('image', 's3');

        $post = new Post(
            [
            'author_id' => 32,
            'title' => $request->title,
            'content' => $request->content,
            'image' => basename($path)
            ]
        );

        $post->saveOrFail();
        return $post;
    }

    public function show(Post $post)
    {
        return Storage::disk('s3')->response('image/' . $post->image);
    }
}
