<?php

namespace App\Http\Controllers\Admin;

use App\Model\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagsController extends Controller
{
    public function get_all()
    {
        return Tag::all();
    }

    public function edit($id)
    {
        $res = Tag::find($id);
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
        Tag::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title_en' => 'required',
            'title_ru' => 'required',
            'title_uz' => 'required',
        ]);
        $tag = Tag::find($id);
        $tag->update($request->all());
    }

    public function destroy($id)
    {
        Tag::find($id)->delete();
    }
}
