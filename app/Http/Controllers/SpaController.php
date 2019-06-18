<?php

namespace App\Http\Controllers;

use App\Model\AboutUs;
use App\Model\Events;
use App\Model\Faq;
use App\Model\Files;
use App\Model\Gallery;
use App\Model\MainPage\MainPageAboutUs;
use App\Model\MainPage\MainPageEvent;
use App\Model\NonResidents;
use App\Model\Residents;
use App\Model\Titles\Logo;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function index()
    {
        return view('app');
    }

    public function new_resident(Request $request)
    {
        $this->validate($request, [
            'place_of_education' => 'required',
            'direction_code' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'father_name' => 'required',
            'date_of_birth' => 'required',
            'citizenship' => 'required',
            'client_requisite' => 'required',
            'residential_address' => 'required',
            'school_region' => 'required',
            'school_district' => 'required',
            'school_number_or_name' => 'required',
            'graduation_year' => 'required',
            'education_language' => 'required',
            'certificate_number' => 'required',
            'act_number' => 'required',
            'documents_graduate_9_grade' => 'required',
            'phone' => 'required',
            'files' => 'required',
        ]);

        $files_residents = Residents::add($request->all());
        $filesName = $files_residents->upload($request->file('files'));

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public function new_non_resident(Request $request)
    {
        $this->validate($request, [
            'direction_code' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'father_name' => 'required',
            'date_of_birth' => 'required',
            'citizenship' => 'required',
            'client_requisite' => 'required',
            'residential_address' => 'required',
            'education_language' => 'required',
            'phone' => 'required',
            'files' => 'required',
        ]);

        $files_residents = NonResidents::add($request->all());
        $filesName = $files_residents->upload($request->file('files'));

        return response()->json([
            "message" => "Success",
            "files" => $filesName
        ], 200);
    }

    public function destroy(Request $request)
    {
        Files::removeFiles($request->all(), 'temporary/');
        return response()->json(["message" => "Success"], 200);
    }

    public function main_get()
    {
        return [
            'about_us' => MainPageAboutUs::all(),
            'event' => MainPageEvent::all()
        ];
    }

    public function get_titles()
    {
        return [ 'logo' => Logo::all()[0] ];
    }

    public function get_logo()
    {
        return Logo::all();
    }

    public function get_questions()
    {
        return Faq::all();
    }

    public function get_question($id)
    {
        return Faq::find($id);
    }

    public function get_image_gallery()
    {
        return Gallery::all();
    }

    public function get_about_us()
    {
        return AboutUs::all();
    }

    public function get_events()
    {
        return Events::all();
    }

    public function get_event($id)
    {
        return Events::find($id);
    }
}
