package main

import "fmt"

func test1() int {
	num1 := 1
	num2 := 3
	return num1 + num2
}

func main() {
	num := test1()
	fmt.Println(num)
}
