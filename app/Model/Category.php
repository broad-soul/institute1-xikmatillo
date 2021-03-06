<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['title_en', 'title_ru', 'title_uz'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
