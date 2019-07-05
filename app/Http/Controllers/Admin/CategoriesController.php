<?php

namespace App\Http\Controllers\Admin;

use App\Model\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    public function get_all()
    {
        return Category::all();
    }

    public function edit($id)
    {
        $res = Category::find($id);
        if ($res) return $res;
        return response()->json(["message" => "Error"], 400);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title_en' => 'required',
            'title_ru' => 'required',
            'title_uz' => 'required',
        ]);
        Category::create($request->all());
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'title_en' => 'required',
            'title_ru' => 'required',
            'title_uz' => 'required',
        ]);
        $category = Category::find($request->id);
        $category->update($request->all());
    }

    public function destroy($id)
    {
       Category::find($id)->delete();
    }
}
