<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BreakingNews extends Model
{
    protected $table = 'breaking_newses';

    function news(): BelongsTo
    {
        return $this->belongsTo(News::class);
    }
}