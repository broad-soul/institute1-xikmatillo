<?php
/**
 * Created by PhpStorm.
 * User: sarvar
 * Date: 13.06.2019
 * Time: 14:12
 */

namespace App\Model\MainPage;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    protected $table = 'main_page_about_us';
    protected $fillable = [
        'visible',
        'bgimage',
        'en',
        'ru',
        'uz'
    ];

    public static function add($fields)
    {
        $about_us = new static;
        $about_us::query()->delete();
        $about_us->fill($fields);
        $about_us->save();
        return $about_us;
    }
}
