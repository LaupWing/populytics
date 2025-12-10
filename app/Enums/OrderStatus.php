<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Processing = 'processing';
    case Accepted = 'accepted';
}
