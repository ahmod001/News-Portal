<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class News extends Model
{
    protected $table ='newses';

    function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    function reporter(): BelongsTo
    {
        return $this->belongsTo(NewsReporter::class, 'reporter_id');
    }
}