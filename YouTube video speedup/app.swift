import Cocoa
import SafariServices
import SwiftUI

@available(macOS 10.15, *)
struct HelloWorldView: View {
    var body: some View {
        VStack {
            Text("Feel free to close the app and use Safari extension as is. Happy watching ❤️")
            .padding()
        }
    }
}

@main
@available(macOS 11.0, *)
struct MySafariApp: App {
    var body: some Scene {
        WindowGroup {
            HelloWorldView()
        }
    }
}
