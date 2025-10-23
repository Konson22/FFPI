<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\User;

class TestAppointmentSeeders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'appointments:test-seeders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the appointment seeders by running them and showing statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Appointment Seeders...');
        $this->newLine();

        // Check if we have doctors and patients
        $doctorCount = Doctor::count();
        $patientCount = User::where('role', 'user')->count();
        $appointmentCount = Appointment::count();

        $this->info("Current data:");
        $this->line("- Doctors: {$doctorCount}");
        $this->line("- Patients: {$patientCount}");
        $this->line("- Appointments: {$appointmentCount}");
        $this->newLine();

        if ($doctorCount === 0 || $patientCount === 0) {
            $this->warn('No doctors or patients found. Please run DoctorSeeder first and create some users.');
            return;
        }

        // Run the appointment seeder
        $this->info('Running AppointmentSeeder...');
        $this->call('db:seed', ['--class' => 'AppointmentSeeder']);

        // Show updated statistics
        $newAppointmentCount = Appointment::count();
        $createdAppointments = $newAppointmentCount - $appointmentCount;

        $this->newLine();
        $this->info("AppointmentSeeder completed!");
        $this->line("Created {$createdAppointments} new appointments");
        $this->line("Total appointments: {$newAppointmentCount}");

        // Show appointment statistics by status
        $this->newLine();
        $this->info("Appointment statistics by status:");
        $statuses = Appointment::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->orderBy('count', 'desc')
            ->get();

        foreach ($statuses as $status) {
            $this->line("- {$status->status}: {$status->count}");
        }

        // Show appointment statistics by type
        $this->newLine();
        $this->info("Appointment statistics by type:");
        $types = Appointment::selectRaw('appointment_type, COUNT(*) as count')
            ->groupBy('appointment_type')
            ->orderBy('count', 'desc')
            ->get();

        foreach ($types as $type) {
            $this->line("- {$type->appointment_type}: {$type->count}");
        }

        // Show appointment statistics by consultation type
        $this->newLine();
        $this->info("Appointment statistics by consultation type:");
        $consultationTypes = Appointment::selectRaw('consultation_type, COUNT(*) as count')
            ->groupBy('consultation_type')
            ->orderBy('count', 'desc')
            ->get();

        foreach ($consultationTypes as $type) {
            $this->line("- {$type->consultation_type}: {$type->count}");
        }

        $this->newLine();
        $this->info('Test completed successfully!');
    }
}