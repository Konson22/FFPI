<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\EducationResource;


class EducationalResourseController extends Controller
{
    public function index()
    {
        $resource = EducationResource::all();       
        
        return response()->json([
            'resource' => $resource,
        ], 200);
      
    }
}
