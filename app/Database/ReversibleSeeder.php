<?php

namespace App\Database;

use Illuminate\Database\Seeder;

abstract class ReversibleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    abstract public function run(): void;

    /**
     * Reverse the database seeds (rollback).
     */
    abstract public function down(): void;
}

