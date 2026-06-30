cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()cmake_minimum_required(VERSION 3.20)

project(MoonshotRobotics
    VERSION 0.1.0
    DESCRIPTION "C++ reinforcement-learning core for Moonshot Robotics"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type fallback
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler warnings
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Source files
file(GLOB_RECURSE MOONSHOT_SOURCES
    src/*.cpp
)

file(GLOB_RECURSE MOONSHOT_HEADERS
    include/*.hpp
    include/*.h
)

# Main executable
add_executable(moonshot_rl
    ${MOONSHOT_SOURCES}
    ${MOONSHOT_HEADERS}
)

target_include_directories(moonshot_rl
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Optional optimization flags
target_compile_definitions(moonshot_rl
    PRIVATE
        MOONSHOT_VERSION="${PROJECT_VERSION}"
)

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_definitions(moonshot_rl PRIVATE MOONSHOT_RELEASE=1)
endif()

# Output directory
set_target_properties(moonshot_rl PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Optional tests
option(MOONSHOT_BUILD_TESTS "Build Moonshot Robotics tests" OFF)

if(MOONSHOT_BUILD_TESTS)
    enable_testing()

    file(GLOB_RECURSE MOONSHOT_TESTS
        tests/*.cpp
    )

    add_executable(moonshot_tests
        ${MOONSHOT_TESTS}
    )

    target_include_directories(moonshot_tests
        PRIVATE
            ${CMAKE_CURRENT_SOURCE_DIR}/include
    )

    add_test(NAME moonshot_tests COMMAND moonshot_tests)
endif()
