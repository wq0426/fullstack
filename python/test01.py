from collections import deque
from functools import reduce

class Testa:
    def __init__(self):
        self.name = 'xiaowang'
        self.age = 13
    def __str__(self):
        return 'Testa class'

def testa():
    print('testa')
a = [1,2,3]
b = reduce(lambda x,y: x + y, a)
print(b)