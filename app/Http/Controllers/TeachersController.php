<?php

namespace App\Http\Controllers;

use App\Model\Teachers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeachersController extends Controller
{
    public function create(Request $request)
    {
        $file = $request->photo;
        $ext = $file->getClientOriginalExtension();
        $fileName = str_random(10) . '.' . $ext;
        $file->storeAs('public', $fileName);
        $data = $request->all();
        $data['photo'] = $fileName;
        Teachers::add($data);
    }

    public function edit($id)
    {
        return Teachers::find($id);
    }

    public function update(Request $request)
    {
        $teacher = Teachers::find($request->id);
        $data = $request->all();
        $file = $request->photo;
        $data['photo'] = $teacher->photo;
        if ($file !== 'undefined') {
            Storage::delete('public/' . $teacher->photo);
            $ext = $file->getClientOriginalExtension();
            $fileName = str_random(10) . '.' . $ext;
            $file->storeAs('public', $fileName);
            $data['photo'] = $fileName;
        }
        $teacher->edit($data);
    }

    public function destroy($id)
    {
        Teachers::find($id)->delete();
    }

    public function all()
    {
        return Teachers::all();
    }

    public function one($id)
    {
        return Teachers::find($id);
    }
}
