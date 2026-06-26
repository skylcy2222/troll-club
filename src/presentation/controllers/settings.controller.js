class SettingsController {
  async get(req, res) {
    res.json({
      success: true,
      data: {
        theme: "monochrome",
        language: "ko",
        notifications: true,
      },
    });
  }

  async update(req, res) {
    res.json({
      success: true,
      data: {
        saved: true,
        input: req.body,
      },
    });
  }
}

module.exports = SettingsController;