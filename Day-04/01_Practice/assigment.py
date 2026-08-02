# reverse a string
str = "akash"
j = len(str)-1
result = ''
for k in range(j, -1, -1):
    result = result+ str[k]
    
print(result)




# // 2) Print hello for 5 times without using the loops
def hello(x):
    if x == 1:
        print("hello")
        return
    print("hello")
    hello(x-1)

hello(5)
