<?php

namespace App\Http\Controllers;

use App\Residents;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function store(Request $request)
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
        $profiles = Residents::add($request->all());
        return $profiles->uploadFiles($request->file('files'));
    }

    public function destroy(Request $request)
    {
        return Residents::removeFiles($request->all());
    }
}
