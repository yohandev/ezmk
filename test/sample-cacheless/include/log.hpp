#pragma once

#include <iostream>

namespace log
{
    void message(char* m);
    void error(char* m);
    void test()
    {
        std::cout << "two" << std::endl;
    }
} // namespace log
