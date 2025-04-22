<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FruitsFetched extends Mailable
{
    use SerializesModels;

    public $totalFruits;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($totalFruits)
    {
        $this->totalFruits = $totalFruits;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.fruits_fetched')
                    ->with([
                        'totalFruits' => $this->totalFruits,
                    ])
                    ->subject('Fruit Sync Completed');
    }
}
