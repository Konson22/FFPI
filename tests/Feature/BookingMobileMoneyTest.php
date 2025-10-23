<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Organization;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use Carbon\Carbon;

class BookingMobileMoneyTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_booking_and_initiate_momo_with_test_number()
    {
        // Speed up MoMo HTTP failure in test env to avoid long waits
        config()->set('services.mtn_momo.connect_timeout', 1);
        config()->set('services.mtn_momo.timeout', 1);

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $organization = Organization::create([
            'name' => 'Test Org',
            'description' => 'Test org description',
            'status' => 'active',
        ]);

        $event = Event::create([
            'organization_id' => $organization->id,
            'name' => 'Test Event',
            'description' => 'Test description',
            'location' => 'Juba',
            'image' => 'test.jpg',
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        $category = EventCategory::create([
            'event_id' => $event->id,
            'name' => 'General',
            'price' => 1.00,
            'currency' => 'SSP',
            'total_tickets' => 100,
            'available_tickets' => 100,
        ]);

        $payload = [
            'event_id' => $event->id,
            'category_id' => $category->id,
            'quantity' => 1,
            'payment_method' => 'mobile_money',
            'amount' => '1',
            'currency' => 'SSP',
            'mobile_number' => '+211920079070',
        ];

        $response = $this->postJson('/api/bookings', $payload);

        $response->assertStatus(201);

        // Assert booking created
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'event_id' => $event->id,
            'category_id' => $category->id,
            'status' => 'pending',
        ]);

        // Assert payment record exists and normalized fields are set
        $this->assertDatabaseHas('payments', [
            'payment_method' => 'mobile_money',
            'currency' => 'SSP',
            'amount' => '1',
        ]);

        // Fetch the latest payment to assert MSISDN normalization
        $payment = Payment::latest('id')->first();
        $this->assertNotNull($payment);
        $this->assertSame('+211920079070', $payment->mobile_number);
    }
}


