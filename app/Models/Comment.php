<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['description', 'user_id', 'news_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}