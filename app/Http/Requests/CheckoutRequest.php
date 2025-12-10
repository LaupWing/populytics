<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'gt:0'],
            'items.*.price' => ['required', 'numeric', 'gt:0'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'items.required' => 'Your cart is empty. Please add items before checkout.',
            'items.array' => 'Invalid cart data format.',
            'items.min' => 'Your cart is empty. Please add at least one item.',
            'items.*.id.required' => 'Product ID is required for each item.',
            'items.*.id.integer' => 'Product ID must be a valid integer.',
            'items.*.id.exists' => 'One or more products in your cart no longer exist.',
            'items.*.quantity.required' => 'Quantity is required for each item.',
            'items.*.quantity.integer' => 'Quantity must be a whole number.',
            'items.*.quantity.gt' => 'Quantity must be greater than 0.',
            'items.*.price.required' => 'Price per unit is required for each item.',
            'items.*.price.numeric' => 'Price per unit must be a valid number.',
            'items.*.price.gt' => 'Price per unit must be greater than 0.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
