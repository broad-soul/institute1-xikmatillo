<?php

namespace App\Http\Controllers;


use App\Model\Exports\NonResidentsExport;
use App\Model\Exports\ResidentsExport;
use App\Model\Faq;
use App\Model\Files;
use App\Model\MainPage\AboutUs;
use App\Model\NonResidents;
use App\Model\Residents;
use App\Model\Titles\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SpaAdminController extends Controller
{

    public function main_store(Request $request)
    {
        return AboutUs::add($request->about_us);
    }

    public function titles_store(Request $request)
    {
        Logo::add($request->all());
        return ['logo' => Logo::all()];
    }

    public function get_residents()
    {
        $residents = Residents::all();

        if(!$residents)
            return response()->json(["message" => "Not Found"], 404);

        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function get_non_residents()
    {
        $non_residents = NonResidents::all();

        if(!$non_residents)
            return response()->json(["message" => "Not Found"], 404);

        return response()->json([
            "message" => "Success",
            "non_residents" => $non_residents
        ], 200);
    }

    public function delete_resident(Request $request)
    {
        $resident = Residents::find($request->id);
        Files::removeFiles($resident->name_archive_with_data);
        $resident->delete();
        $residents = Residents::all();
        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function delete_non_resident(Request $request)
    {
        $resident = NonResidents::find($request->id);
        Files::removeFiles($resident->name_archive_with_data);
        $resident->delete();
        $residents = NonResidents::all();
        return response()->json([
            "message" => "Success",
            "residents" => $residents
        ], 200);
    }

    public function download_file(Request $request)
    {
        return Storage::download('public/' . $request->file_name);
    }

    public function show_resident($id)
    {
        return Residents::find($id);
    }

    public function show_non_resident($id)
    {
        return NonResidents::find($id);
    }

    public function download_residents(Request $request)
    {
        $lang = $request->lang;
        return (new ResidentsExport($lang))->download('residents_'.$lang.'.xlsx');
    }

    public function download_non_residents(Request $request)
    {
        $lang = $request->lang;
        return (new NonResidentsExport($lang))->download('non_residents_'.$lang.'.xlsx');
    }

    public function new_question(Request $request)
    {
        Faq::create($request->all());
        return Faq::all();
    }

    public function delete_question($id)
    {
        Faq::find($id)->delete();
    }

}
