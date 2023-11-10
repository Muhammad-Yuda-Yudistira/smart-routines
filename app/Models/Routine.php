<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;
// use App\Models\Category;

class Routine extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function rules($userId, $routineId = null)
    {
        return [
            'start_time' => [
                'required',
                Rule::unique('routines')->where(function ($query) use ($userId, $routineId) {
                    $query->where('user_id', $userId);
                    if ($routineId) {
                        $query->where('id', '!=', $routineId);
                    }
                }),
            ],
            'end_time' => [
                'required',
                Rule::unique('routines')->where(function ($query) use ($userId, $routineId) {
                    $query->where('user_id', $userId);
                    if ($routineId) {
                        $query->where('id', '!=', $routineId);
                    }
                }),
            ],
        ];
    }
}
