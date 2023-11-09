
def greet(name):
    print(f"Hello1111111111, {name}!")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet(user_name)

    # 추가된 부분: 특정 조건에 따른 메시지 출력
    if len(user_name) > 5:
        print("That's a long name!")
    else:
        print("Nice to meet you")
