class CommunityController {
  constructor({ communityRepository, communityPolicy }) {
    this.communityRepository = communityRepository;
    this.communityPolicy = communityPolicy;

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }

  async list(req, res, next) {
    try {
      const data = this.communityRepository.findAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, description } = req.body;

      this.communityPolicy.validateName(name);
      this.communityPolicy.validateDescription(description);

      const data = this.communityRepository.create({
        name: name.trim(),
        description: description || "",
      });

      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommunityController;