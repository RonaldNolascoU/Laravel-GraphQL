<?php

namespace App;

use App\User;
use App\Comment;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $guarded = [];
    
    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
