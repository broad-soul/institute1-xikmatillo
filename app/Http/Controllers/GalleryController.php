<?php

namespace App\Http\Controllers;

use App\Model\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function get_all()
    {
        return Gallery::all();
    }

    public function create(Request $request)
    {
        $key = $request->keys()[0];
        $file = $request->all()[$key];
        if(!is_object($file))
            return response()->json(["message" => "Not a file"], 400);

        $ext = $file->getClientOriginalExtension();
        $fileName = str_random(10) . '.' . $ext;
        $mime = $file->getClientMimeType();
        $size = $file->getClientSize();

        $file->storeAs('public', $fileName);

        try {
            $newFile = [
                'name' => $fileName,
                'ext' => $ext,
                'mime' => $mime,
                'size' => $size
            ];
            Gallery::create($newFile);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 400);
        }
    }

    public function destroy(Request $request)
    {
        $res = Storage::delete('public/' . $request->name);
        if ($res) {
            Gallery::find($request->id)->delete();
            return response()->json(["message" => "Deleted"], 200);
        }

        return response()->json(["message" => "Error delete"], 409);
    }
}
