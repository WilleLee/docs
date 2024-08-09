# TCP/IP

TCP/IP stack = 인터넷이 발명되면서 함께 개발된 프로토콜 스택 = 실제 인터넷에서 사용되는 프로토콜 스택

application layer - transport layer - internet layer - link layer

transport ~ link layers = 하드웨어/펌웨어, OS 레벨에서 구현/관리 -> 네트워크 기능을 ‘지원’하는 데 목적이 있음
application layer = 어플리케이션 레벨에서 구현/관리 -> 네트워크 기능을 ‘사용’하는 데 목적이 있음

port

- 프로세스와 연결(어플리케이션 프로세스와 시스템을 연결)된 data path 혹은 data channel
- port name을 통해 식별

TCP (transmission control protocol)

- 프로세스 간의 통신에서는 데이터를 안정적으로 주고 받을 수 있는 프로토콜이 필요

Socket
“인터넷 상에서 어떻게 포트를 유니크하게 식별할까?”
-> 인터넷 주소 + port number = socket
즉 socket = 주소, namespace

프로토콜, IP주소, 포트번호
-> 셋 중 하나라도 다르면 유니크
