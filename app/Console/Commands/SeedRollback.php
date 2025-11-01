<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Database\Seeders\DatabaseSeeder;

class SeedRollback extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:seed:rollback 
                            {--class= : The seeder class to rollback}
                            {--all : Rollback all seeders in reverse order}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rollback database seeders';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $class = $this->option('class');
        $all = $this->option('all');

        if ($all) {
            return $this->rollbackAll();
        }

        if ($class) {
            return $this->rollbackClass($class);
        }

        $this->error('Please specify --class or --all option');
        return 1;
    }

    /**
     * Rollback a specific seeder class.
     */
    protected function rollbackClass(string $class)
    {
        $fullClass = "Database\\Seeders\\{$class}";
        
        if (!class_exists($fullClass)) {
            $this->error("Seeder class {$fullClass} does not exist.");
            return 1;
        }

        $seeder = new $fullClass();

        if (!method_exists($seeder, 'down')) {
            $this->error("Seeder {$class} does not have a down() method.");
            return 1;
        }

        $this->info("Rolling back {$class}...");

        try {
            DB::beginTransaction();
            $seeder->down();
            DB::commit();
            $this->info("Successfully rolled back {$class}");
            return 0;
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Error rolling back {$class}: " . $e->getMessage());
            return 1;
        }
    }

    /**
     * Rollback all seeders in reverse order.
     */
    protected function rollbackAll()
    {
        $seeder = new DatabaseSeeder();
        $seeders = $this->getSeederClasses($seeder);

        $this->info('Rolling back all seeders in reverse order...');
        
        // Rollback in reverse order
        foreach (array_reverse($seeders) as $seederClass) {
            $className = class_basename($seederClass);
            $fullClass = "Database\\Seeders\\{$className}";

            if (!class_exists($fullClass)) {
                $this->warn("Seeder class {$fullClass} does not exist. Skipping...");
                continue;
            }

            $seederInstance = new $fullClass();

            if (!method_exists($seederInstance, 'down')) {
                $this->warn("Seeder {$className} does not have a down() method. Skipping...");
                continue;
            }

            $this->info("Rolling back {$className}...");

            try {
                DB::beginTransaction();
                $seederInstance->down();
                DB::commit();
                $this->info("✓ Successfully rolled back {$className}");
            } catch (\Exception $e) {
                DB::rollBack();
                $this->error("✗ Error rolling back {$className}: " . $e->getMessage());
            }
        }

        $this->info('Rollback completed!');
        return 0;
    }

    /**
     * Get seeder classes from DatabaseSeeder.
     */
    protected function getSeederClasses($seeder): array
    {
        // Use reflection to get the seeder instance and extract classes from call array
        $seederInstance = new \Database\Seeders\DatabaseSeeder();
        
        // Read the source file to extract seeder class names
        $reflection = new \ReflectionClass($seederInstance);
        $file = file_get_contents($reflection->getFileName());
        
        // Extract all Seeder::class references
        preg_match_all('/([A-Z][a-zA-Z]*Seeder)::class/', $file, $matches);
        
        return array_unique($matches[1] ?? []);
    }
}

