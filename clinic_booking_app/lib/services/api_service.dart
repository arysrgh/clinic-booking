import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = "http://localhost:3000";

  Future login(String email) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      body: jsonEncode({"email": email}),
      headers: {"Content-Type": "application/json"},
    );

    return jsonDecode(res.body);
  }
}