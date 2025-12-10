<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * Determine whether the user can view the model.
     * User can only view their own orders.
     */
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    /**
     * Determine whether the user can update the model.
     * Only the owner can update their order.
     */
    public function update(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Only the owner can delete their order.
     */
    public function delete(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }
}
