import 'package:flutter/material.dart';
import '../services/api_service.dart';

class LoginScreen extends StatelessWidget {
  final api = ApiService();
  final emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Column(
        children: [
          TextField(controller: emailController),
          ElevatedButton(
            onPressed: () async {
              final res = await api.login(emailController.text);
              print(res);
            },
            child: Text("Login"),
          )
        ],
      ),
    );
  }
}