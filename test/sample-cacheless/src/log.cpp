#include "log.hpp"

void log::message(char* m)
{
    std::cout << "[msg] " << m << std::endl;
}

void log::error(char* m)
{
    std::cout << "[err] " << m << std::endl;
}