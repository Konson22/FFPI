<?php

return [
    'modules' => [
        [
            'id' => 'module_1',
            'title' => 'Sexual and Reproductive Health Basics',
            'description' => 'Learn about the importance of sexual and reproductive health and rights for individuals and communities.',
            'category' => 'SRHR',
            'target_audience' => ['youth', 'women', 'couples', 'students'],
            'lessons' => [
                [
                    'id' => 'lesson_1_1',
                    'title' => 'Understanding SRHR',
                    'content' => 'Sexual and Reproductive Health and Rights (SRHR) ensure that everyone has access to information and services related to their bodies, sexuality, and reproduction.',
                    'media' => [
                        'type' => 'image',
                        'url' => 'https://example.com/srhr_basics.jpg',
                    ],
                    'resources' => [
                        [
                            'title' => 'WHO SRHR Overview',
                            'link' => 'https://www.who.int/reproductivehealth/en/',
                        ],
                    ],
                    'quiz' => [
                        [
                            'question' => 'What does SRHR stand for?',
                            'options' => [
                                'Sexual and Reproductive Health and Rights',
                                'Social and Reproductive Health Regulations',
                                'Sexual Rights and Human Relationships',
                            ],
                            'answer' => 'Sexual and Reproductive Health and Rights',
                        ],
                    ],
                ],
                [
                    'id' => 'lesson_1_2',
                    'title' => 'Why SRHR Matters',
                    'content' => 'SRHR promotes health, equality, and dignity by empowering individuals to make informed choices about their bodies and relationships.',
                    'media' => [
                        'type' => 'video',
                        'url' => 'https://www.youtube.com/watch?v=example',
                    ],
                ],
            ],
        ],
        [
            'id' => 'module_2',
            'title' => 'Family Planning and Contraception',
            'description' => 'Understand different methods of contraception, how they work, and their benefits.',
            'category' => 'Family Planning',
            'target_audience' => ['women', 'couples', 'youth'],
            'lessons' => [
                [
                    'id' => 'lesson_2_1',
                    'title' => 'Modern Contraceptive Methods',
                    'content' => 'Modern contraceptives include pills, condoms, injectables, implants, and IUDs. Each method works differently to prevent pregnancy.',
                    'resources' => [
                        [
                            'title' => 'WHO Family Planning Fact Sheet',
                            'link' => 'https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception',
                        ],
                    ],
                    'quiz' => [
                        [
                            'question' => 'Which of the following is a modern contraceptive method?',
                            'options' => ['Herbal remedies', 'Implant', 'Traditional beads'],
                            'answer' => 'Implant',
                        ],
                    ],
                ],
            ],
        ],
        [
            'id' => 'module_3',
            'title' => 'Healthy Relationships',
            'description' => 'Explore how to build and maintain healthy, respectful, and supportive relationships.',
            'category' => 'Relationships',
            'target_audience' => ['youth', 'couples', 'students'],
            'lessons' => [
                [
                    'id' => 'lesson_3_1',
                    'title' => 'What Makes a Relationship Healthy?',
                    'content' => 'Healthy relationships are based on respect, trust, communication, and equality.',
                    'quiz' => [
                        [
                            'question' => 'Which of these is a sign of a healthy relationship?',
                            'options' => ['Jealousy', 'Trust', 'Control'],
                            'answer' => 'Trust',
                        ],
                    ],
                ],
            ],
        ],
    ],
];
