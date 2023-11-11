def greet(name):
    print(f"Hello1111111111, {name}!")

def get_name_length(name):
    return len(name)

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet(user_name)

    # 추가된 부분: 특정 조건에 따른 메시지 출력함
    if len(user_name) > 5:
        print("That's a long name!")
    else:
        print("Nice to meet you!")

    # 나이를 입력받아 출력하는 부분 추가
    user_age = input("Enter your age: ")
    print("You are {user_age} years old.")

